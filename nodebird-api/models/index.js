import Sequelize from 'sequelize';
const env = process.env.NODE_ENV || 'development';
import * as configJson from '../config/config';
const config = configJson[env];
import User from './user';
import Post from './post';
import Hashtag from './hashtag';
import Domain from './domain';

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
db.Domain = Domain;

User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);
Domain.init(sequelize);

User.associate(db);
Post.associate(db);
Hashtag.associate(db);
Domain.associate(db);

export default db;
