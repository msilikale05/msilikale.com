<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'msilikalecom');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'kl45g:Kp-r+ZhTr@@}mwix/e)mnqgf#>R+z>XoU]PBgZsC_p~gt>]+4x^y|Sw1[l');
define('SECURE_AUTH_KEY',  'ws?.Ur+`aZ+4s*vaE&~e:hJdeQt!Sb 94JMij^ldrD}CRf}eDH`]@K2<sBStFjF;');
define('LOGGED_IN_KEY',    'GMTIG?WI|eaY$Mb``X;#%MNYqE|VB0.hsB)B2 > 2Ar:E(J)Jkq0*?XZYk<&Ht5r');
define('NONCE_KEY',        '$2PjLgl,H=%d%0CJp?t(YFFX9B01_gIAl{,WZJlp3S{*y6^duOO,4x!*Hl%oH5vf');
define('AUTH_SALT',        's1$Mc0291 gkdzZ:z|tV^~Ro83E(<A^<N9I2`NcwUM#vM3[.-l`5?GFo`zv$IOAZ');
define('SECURE_AUTH_SALT', 't/zc-:cZT6]nHbm`# ~Rdb6yMG?NE/.:}*ASG`>_f6?+=}7uJjsmvM~ HcTQ`&)7');
define('LOGGED_IN_SALT',   'zR(P~7k%I8E (f$D} =f^E`Lf39KahfM?#M,Qw(-/|/3}9SfoGTw[Kti<HXmn+4&');
define('NONCE_SALT',       '!sAQ.U9I.[G}}w+u{eMbyiU~J~`Npn5LZL7:<*3RvIFQ-(kI`3t)QCF~feiFhpG?');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
