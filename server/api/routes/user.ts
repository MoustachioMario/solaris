import { Router } from "express";
import { ExpressJoiInstance } from "express-joi-validation";
import { DependencyContainer } from "../../services/types/DependencyContainer";
import UserController from '../controllers/user';
import { MiddlewareContainer } from "../middleware";
import { singleRoute } from "../singleRoute";

export default (router: Router, mw: MiddlewareContainer, validator: ExpressJoiInstance, container: DependencyContainer) => {
    const controller = UserController(container);

    router.get('/api/user/leaderboard',
        ...singleRoute(
            controller.listLeaderboard,
            mw.core.handleError)
    );

    router.post('/api/user/',
        ...singleRoute(
            controller.create,
            mw.core.handleError)
    );

    router.get('/api/user/settings',
        ...singleRoute(
            controller.getSettings,
            mw.core.handleError)
    );

    router.put('/api/user/settings',
        ...singleRoute(
            mw.auth.authenticate(),
            controller.saveSettings,
            mw.core.handleError)
    );

    router.get('/api/user/subscriptions',
        ...singleRoute(
            mw.auth.authenticate(),
            controller.getSubscriptions,
            mw.core.handleError)
    );

    router.put('/api/user/subscriptions',
        ...singleRoute(
            mw.auth.authenticate(),
            controller.saveSubscriptions,
            mw.core.handleError)
    );

    router.get('/api/user/credits',
        ...singleRoute(
            mw.auth.authenticate(),
            controller.getCredits,
            mw.core.handleError)
    );

    router.get('/api/user/',
        ...singleRoute(
            mw.auth.authenticate(),
            controller.detailMe,
            mw.core.handleError)
    );

    router.get('/api/user/avatars',
        ...singleRoute(
            mw.auth.authenticate(),
            controller.listMyAvatars,
            mw.core.handleError)
    );

    router.post('/api/user/avatars/:avatarId/purchase',
        ...singleRoute(
            mw.auth.authenticate(),
            controller.purchaseAvatar,
            mw.core.handleError)
    );

    router.get('/api/user/:id',
        ...singleRoute(
            controller.detail,
            mw.core.handleError)
    );

    router.get('/api/user/achievements/:id',
        ...singleRoute(
            controller.getAchievements,
            mw.core.handleError)
    );

    router.put('/api/user/changeEmailPreference',
        ...singleRoute(
            mw.auth.authenticate(),
            controller.updateEmailPreference,
            mw.core.handleError)
    );

    router.put('/api/user/changeEmailOtherPreference',
        ...singleRoute(
            mw.auth.authenticate(),
            controller.updateEmailOtherPreference,
            mw.core.handleError)
    );

    router.put('/api/user/changeUsername',
        ...singleRoute(
            mw.auth.authenticate(),
            controller.updateUsername,
            mw.core.handleError)
    );

    router.put('/api/user/changeEmailAddress',
        ...singleRoute(
            mw.auth.authenticate(),
            controller.updateEmailAddress,
            mw.core.handleError)
    );

    router.put('/api/user/changePassword',
        ...singleRoute(
            mw.auth.authenticate(),
            controller.updatePassword,
            mw.core.handleError)
    );

    router.post('/api/user/requestResetPassword',
        ...singleRoute(
            controller.requestPasswordReset,
            mw.core.handleError)
    );

    router.post('/api/user/resetPassword',
        ...singleRoute(
            controller.resetPassword,
            mw.core.handleError)
    );

    router.post('/api/user/requestUsername',
        ...singleRoute(
            controller.requestUsername,
            mw.core.handleError)
    );

    router.delete('/api/user/closeaccount',
        ...singleRoute(
            mw.auth.authenticate(),
            controller.delete,
            mw.core.handleError)
    );

    return router;
}