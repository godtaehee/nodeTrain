import Sequelize from 'sequelize';
const env = process.env.NODE_ENV || 'development';
import * as configJson from '../config/config';
const config = configJson[env];
import User from './user';
import Post from './post';
import Hashtag from './hashtag';

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;

User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);

User.associate(db);
Post.associate(db);
Hashtag.associate(db);

export default db;
