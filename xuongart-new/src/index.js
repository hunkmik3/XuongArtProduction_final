'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Set public permissions for Projects content type only
    const contentTypes = [
      'api::project.project'
    ];

    for (const contentType of contentTypes) {
      try {
        await strapi.query('plugin::users-permissions.permission').updateMany({
          where: {
            action: `${contentType}.find`,
            role: { type: 'public' }
          },
          data: { enabled: true }
        });

        await strapi.query('plugin::users-permissions.permission').updateMany({
          where: {
            action: `${contentType}.findOne`,
            role: { type: 'public' }
          },
          data: { enabled: true }
        });

        console.log(`✅ Public permissions set for ${contentType}`);
      } catch (error) {
        console.log(`⚠️ Could not set permissions for ${contentType}:`, error.message);
      }
    }
  },
};