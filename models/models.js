import {Sequelize} from 'sequelize';
const sequelize = require('../db/db');
require('dotenv').config();

const TempUser = sequelize.define('TempUser', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    number: {
        type: Sequelize.STRING,
        allowNull: false
    },
    hash: {
        type: Sequelize.STRING,
        unique: 'hash'
    }
}, {tableName: 'tempUsers'});

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {tableName: 'users'});

const UserData = sequelize.define('UserData', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    number: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
    },
    contactName: {
        type: Sequelize.STRING,
    },
    img: {
        type: Sequelize.STRING,
    }
}, {tableName: 'personal'});

User.hasOne(UserData, {foreignKey: 'id', as: 'personal'});
UserData.belongsTo(User, {as: 'personal', foreignKey: 'id'});

const Role = sequelize.define('Role', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'name'
    },
    readableName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'readableName'
    }
}, {tableName: 'roles'});

Role.hasMany(UserData, {foreignKey: 'roleId'});
UserData.belongsTo(Role, {as: 'role', foreignKey: 'roleId'});

const TrashPlace = sequelize.define('TrashPlace', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
    },
    number: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    text: {
        type: Sequelize.STRING,
    }
}, {tableName: 'trashPlaces'});

const Follower = sequelize.define('Follower', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'email'
    },
}, {tableName: 'followers'});

const MessageTheme = sequelize.define('MessageTheme', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    closed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {tableName: 'messageThemes'});

UserData.hasMany(MessageTheme, {
    foreignKey: 'creatorId'
});
UserData.hasMany(MessageTheme, {
    foreignKey: 'participantId'
});
MessageTheme.belongsTo(UserData, {as: 'creator', foreignKey: 'creatorId'});
MessageTheme.belongsTo(UserData, {as: 'participant', foreignKey: 'participantId'});

const Message = sequelize.define('Message', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    read: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {tableName: 'messages'})

UserData.hasMany(Message, {foreignKey: 'creatorId'});
Message.belongsTo(UserData, {as: 'creator', foreignKey: 'creatorId'});

MessageTheme.hasMany(Message, {
    foreignKey: 'themeId'
});
Message.belongsTo(MessageTheme, {as: 'theme', foreignKey: 'themeId'});

const Agreement = sequelize.define('Agreement', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    ls: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
    },
    balance: {
        type: Sequelize.STRING,
    },
    inn: {
        type: Sequelize.STRING,
    },
    rs: {
        type: Sequelize.STRING,
    },
    kpp: {
        type: Sequelize.STRING,
    },
    ks: {
        type: Sequelize.STRING,
    },
    ogrn: {
        type: Sequelize.STRING,
    },
    bik: {
        type: Sequelize.STRING,
    },
    bank: {
        type: Sequelize.STRING,
    },
    lawAddress: {
        type: Sequelize.STRING,
    },
    postAddress: {
        type: Sequelize.STRING,
    },
    factAddress: {
        type: Sequelize.STRING,
    },
    userType: {
        type: Sequelize.INTEGER,
    },
}, {tableName: 'agreements'});

UserData.hasMany(Agreement, {foreignKey: 'userId', as: 'agreements'});
Agreement.belongsTo(UserData, {as: 'user', foreignKey: 'userId'});

const Service = sequelize.define('Service', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {tableName: 'services'});

Service.hasOne(Agreement, {foreignKey: 'serviceId', as: 'agreements'});
Agreement.belongsTo(Service, {as: 'service', foreignKey: 'serviceId'});

const Payment = sequelize.define('Payment', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    cost: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    link: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {tableName: 'payments'});

Agreement.hasMany(Payment, {foreignKey: 'agreementId', as: 'payments'});
Payment.belongsTo(Agreement, {as: 'agreement', foreignKey: 'agreementId'});

const Account = sequelize.define('Account', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    link: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {tableName: 'accounts'});

Agreement.hasMany(Account, {foreignKey: 'agreementId', as: 'accounts'});
Account.belongsTo(Agreement, {as: 'agreement', foreignKey: 'agreementId'});

const Test = sequelize.define('Test', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {tableName: 'tests'});

const IBlock = sequelize.define('IBlock', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    linkName: {
        type: Sequelize.STRING,
        unique: 'linkName',
    },
    visible: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    seoTitle: {
        type: Sequelize.STRING,
    },
    seoKeywords: {
        type: Sequelize.STRING,
    },
    seoDescription: {
        type: Sequelize.STRING,
    }
}, {tableName: 'iblocks'});

const IBlockElement = sequelize.define('IBlockElement', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    linkName: {
        type: Sequelize.STRING,
        unique: 'linkName',
    },
    text: {
        type: Sequelize.TEXT,
    },
    smallText: {
        type: Sequelize.TEXT,
    },
    visible: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    seoTitle: {
        type: Sequelize.STRING,
    },
    seoKeywords: {
        type: Sequelize.STRING,
    },
    seoDescription: {
        type: Sequelize.STRING,
    }
}, {tableName: 'iblockelements'});

const IBlockElementProperty = sequelize.define('IBlockElementProperty', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    value: {
        type: Sequelize.STRING,
        allowNull: false
    },
    properties: {
        type: Sequelize.JSON,
    }
}, {tableName: 'iblockelementsproperties'});

const UserField = sequelize.define('UserField', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    serviceName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'TEXT'
    },
    props: {
        type: Sequelize.JSON,
        get() {
            return JSON.parse(this.getDataValue('props'));
        },
    },
    visible: {
        type: Sequelize.BOOLEAN,
    }
}, {tableName: 'userfields'});

const File = sequelize.define('File', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    type: {
        type: Sequelize.ENUM,
        values: ['iblock', 'message', 'other'],
        defaultValue: 'iblock'
    },
    link: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
    },
    fullLink: {
        type: Sequelize.VIRTUAL,
        get() {
          return process.env.PATH_TO_STATIC + this.link;
        },
    }
}, {tableName: 'files'});

const Setting = sequelize.define('Setting', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    serviceName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    value: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    visible: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    props: {
        type: Sequelize.JSON,
    }
}, {tableName: 'settings'});

IBlock.hasMany(IBlockElement, {foreignKey: 'iblockId', as: 'elements'});
IBlockElement.belongsTo(IBlock, {as: 'iblock', foreignKey: 'iblockId'});

IBlockElement.hasMany(IBlockElementProperty, {foreignKey: 'iblockElementId', as: 'properties'});
IBlockElementProperty.belongsTo(IBlockElement, {as: 'iblockElement', foreignKey: 'iblockElementId'});

UserField.hasMany(IBlockElementProperty, {foreignKey: 'userFieldId', as: 'properties'});
IBlockElementProperty.belongsTo(UserField, {as: 'userfield', foreignKey: 'userFieldId'});

IBlock.hasMany(UserField, {foreignKey: 'iblockId', as: 'userFields'});
UserField.belongsTo(IBlock, {as: 'iblock', foreignKey: 'iblockId'});

File.hasMany(IBlockElement, {foreignKey: 'imgId', as: 'imgIblocks'});
IBlockElement.belongsTo(File, {as: 'img', foreignKey: 'imgId'});

File.hasMany(IBlockElement, {foreignKey: 'smallImgId', as: 'smallImgIblocks'});
IBlockElement.belongsTo(File, {as: 'smallImg', foreignKey: 'smallImgId'});

IBlockElement.belongsToMany(File, {through: 'iblockelements_files', as: 'files'});
File.belongsToMany(IBlockElement, {through: 'iblockelements_files', as: 'iblocks'});

TrashPlace.belongsToMany(File, {through: 'trashplaces_files', as: 'files'});
File.belongsToMany(TrashPlace, {through: 'trashplaces_files', as: 'places'});

Message.belongsToMany(File, {through: 'messages_files', as: 'files'});
File.belongsToMany(Message, {through: 'messages_files', as: 'messages'});

//нельзя обновлять инфоблоки
// sequelize.sync({ alter: true });


module.exports = {
    Role,
    User,
    UserData,
    TempUser,
    TrashPlace,
    Follower,
    MessageTheme,
    Message,
    Agreement,
    Test,
    Account,
    Payment,
    IBlock,
    File,
    Service,
    UserField,
    IBlockElement,
    IBlockElementProperty,
    Setting
};