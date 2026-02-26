import authRoute from '@/features/auth/routes/auth.route';
import achievementsRoute from '@/features/sports/app/about-us/routes/achievements.route';
import adminStructureRoute from '@/features/sports/app/about-us/routes/admin-structure.route';
import keyPersonnelRoute from '@/features/sports/app/about-us/routes/key-personnel.route';
import { Application } from 'express';
import express from 'express';
import { ROOT_PATH } from '../constants';
import path from 'path';
import sportsPersonnelRoute from '@/features/sports/app/sports/routes/sports-personnel.route';
import sportsEventsRoute from '@/features/sports/app/sports/routes/sports-events.route';
import wbsCouncilDesignationsRoute from '@/features/sports/app/wbs-council-sports/routes/wbs-council-designations.route';
import advisoryWorkingRoute from '@/features/sports/app/wbs-council-sports/routes/advisory-working.route';

function appRoutes(app: Application) {
  app.use('/api/v1/auth', authRoute);
  app.use('/api/v1/sports/about-us/achievements', achievementsRoute);
  app.use('/api/v1/sports/about-us/admin-structure', adminStructureRoute);
  app.use('/api/v1/sports/about-us/key-personnel', keyPersonnelRoute);
  app.use('/api/v1/sports/sports/sports-personnel', sportsPersonnelRoute);
  app.use('/api/v1/sports/sports/sports-events', sportsEventsRoute);
  app.use(
    '/api/v1/sports/wbs-council-sports/designations',
    wbsCouncilDesignationsRoute,
  );
  app.use(
    '/api/v1/sports/wbs-council-sports/advisory-working',
    advisoryWorkingRoute,
  );

  app.use('/uploads', express.static(path.join(ROOT_PATH, 'uploads')));
}

export default appRoutes;
