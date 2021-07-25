const TRADE_CHANCE_BASE = 50;
const TRADE_CHANCE_STEP = 5;
const TRADE_CHANCE_MIN_REPUTATION = 1;

module.exports = class AITradeService {

    constructor(reputationService, randomService, tradeService, gameService) {
        this.reputationService = reputationService;
        this.randomService = randomService;
        this.tradeService = tradeService;
        this.gameService = gameService;

        this.reputationService.on('onReputationIncreased', (args) => this.onReputationIncreased(args.gameId, args.player, args.forPlayer, args.amount));
    }

    async onReputationIncreased(gameId, player, forPlayer) {
        // Make sure the player is AI.
        if (!player.defeated) {
            return;
        }

        let reputation = this.reputationService.getReputation(player, forPlayer);

        if (reputation.score < TRADE_CHANCE_MIN_REPUTATION) {
            return;
        }

        let tradeChance = TRADE_CHANCE_BASE + (TRADE_CHANCE_STEP * reputation.score);
        let tradeRoll = this.randomService.getRandomNumber(100);

        if (tradeRoll <= tradeChance || true) {
            await this._tryTrade(gameId, player, forPlayer);
        }
    }

    async _tryTrade(gameId, player, toPlayer) {
        let game = await this.gameService.getById(gameId);
        
        // TODO: Consider scanning range trade setting.
        // TODO: Trade may need to be refactored first as it uses the old method of saving to DB.

        // Get the differences in tech levels between the two players that the AI can afford.
        let tradeTechs = await this.tradeService.getTradeableTechnologies(game, player, toPlayer._id);

        tradeTechs = tradeTechs.filter(t => t.cost <= Math.floor(player.credits));

        if (!tradeTechs.length) {
            return;
        }

        // Pick a random tech(?) and send it to the player.
        let tradeTech = tradeTechs[this.randomService.getRandomNumber(tradeTechs.length - 1)];
        
        await this.tradeService.sendTechnology(game, player, toPlayer._id, tradeTech.name, tradeTech.level);
    }

};
