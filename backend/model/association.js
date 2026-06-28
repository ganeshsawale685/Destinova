

import Booking from "./booking.model.js";
import Destination from "./destination.model.js";
import Packages from "./packages.model.js";
import Review from "./reviews.model.js";
import User from "./user.model.js";


User.hasMany(Booking,{foreignKey:"userId"})
Booking.belongsTo(User,{foreignKey:"userId"})


User.hasMany(Review,{foreignKey:"userId"})
Review.belongsTo(User,{foreignKey:"userId"})

Packages.hasMany(Booking,{foreignKey:"packageId"})
Booking.belongsTo(Packages,{foreignKey:"packageId"})


Destination.hasMany(Packages,{foreignKey:"destinationId"})
Packages.belongsTo(Destination,{foreignKey:"destinationId"})


Packages.hasMany(Review,{foreignKey:"packageId"})
Review.belongsTo(Packages,{foreignKey:"packageId"})

