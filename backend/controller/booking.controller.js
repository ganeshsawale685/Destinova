import Booking from "../model/booking.model.js";
import Packages from "../model/packages.model.js";

export const statusUpdate = async (request, response) => {

  try {

    let { id } = request.params;

    let { status } = request.body;

    await Booking.update(
      {
        status: status
      },
      {
        where: { id }
      }
    );

    return response.status(200).json({
      message: "Booking Updated"
    });

  } catch (error) {

    return response.status(500).json({
      error: error.message
    });
  }
};

export const cancelBooking = async (request, response, next) => {
  try {
    let { id } = request.params;
    await Booking.destroy(

      { where: { id } }
    );
    return response.status(200).json("Booking Cancelled")
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }


}

export const myBooking = async (request, response, next) => {
  try {
    let userId = request.user.userId;

    let bookings = await Booking.findAll({
      where: { userId },
      include: {
        model: Packages
      }
    });

    return response.status(200).json(bookings);

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}

export const createBooking = async (request, response) => {
  try {
    let { packageId, persons,travelDate } = request.body;
    let userId = request.user.userId; // from JWT

    let pkg = await Packages.findByPk(packageId);
    if (!pkg) {
      return response.status(404).json({ message: "Package not found" });
    }
    let duration = pkg.days_night.split(" ")[0]

    let totalAmount =
      pkg.base_price*persons +
      pkg.transport_cost * persons +
      (pkg.hotel_price * persons);


    let booking = await Booking.create({ userId, packageId, duration, persons, totalAmount, status: "pending",travelDate })
    response.status(201).json({
      message: "Booking created", booking
    });

  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};




