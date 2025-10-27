'use strict';

/**
 * image-project lifecycle callbacks
 */

module.exports = {
  // After create
  async afterCreate(event) {
    const { result } = event;
    console.log(`✅ Image project created: ${result.title} (ID: ${result.id})`);
  },

  // After update
  async afterUpdate(event) {
    const { result } = event;
    console.log(`✅ Image project updated: ${result.title} (ID: ${result.id})`);
  },

  // After delete
  async afterDelete(event) {
    const { result } = event;
    console.log(`🗑️ Image project deleted: ID ${result.id}`);
  }
};
