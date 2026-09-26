/**
 * Migration 027: Add OTP verification columns to users table
 */
exports.up = function up(knex) {
    return knex.schema.hasColumn('users', 'otp_code').then(hasColumn => {
        if (!hasColumn) {
            return knex.schema.table('users', (table) => {
                table.boolean('is_verified').notNullable().defaultTo(false);
                table.string('otp_code', 10).nullable();
                table.datetime('otp_expires_at').nullable();
            });
        }
    });
};

exports.down = function down(knex) {
    return knex.schema.hasColumn('users', 'otp_code').then(hasColumn => {
        if (hasColumn) {
            return knex.schema.table('users', (table) => {
                table.dropColumn('is_verified');
                table.dropColumn('otp_code');
                table.dropColumn('otp_expires_at');
            });
        }
    });
};
