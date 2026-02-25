import express from 'express';
import { wbsCouncilDesignationsController } from '../controllers/wbs-council-designations.controller';

const wbsCouncilDesignationsRoute = express.Router();

wbsCouncilDesignationsRoute.post('/', wbsCouncilDesignationsController.add);
wbsCouncilDesignationsRoute.get(
  '/',
  wbsCouncilDesignationsController.getPaginated,
);
wbsCouncilDesignationsRoute.get(
  '/all',
  wbsCouncilDesignationsController.getAll,
);
wbsCouncilDesignationsRoute.put(
  '/sort',
  wbsCouncilDesignationsController.sortShowOrder,
);
wbsCouncilDesignationsRoute.put(
  '/:id',
  wbsCouncilDesignationsController.update,
);
wbsCouncilDesignationsRoute.delete(
  '/:id',
  wbsCouncilDesignationsController.delete,
);
wbsCouncilDesignationsRoute.put(
  '/toggle/:id',
  wbsCouncilDesignationsController.toggleActive,
);

export default wbsCouncilDesignationsRoute;
