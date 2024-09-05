import Team from '../models/teamModel.js';
import { Reservation } from '../models/reservationSchema.js';
import Menu from '../models/menuSchema.js';

export const getCounts = async (req, res) => {
  try {
    const userCount = await Reservation.countDocuments();
    const teamCount = await Team.countDocuments();
    const menuCount = await Menu.countDocuments();

    res.status(200).json({
      userCount,
      teamCount,
      menuCount
    });
  } catch (error) {
    console.error('Error fetching counts:', error);
    res.status(500).json({ message: 'Failed to fetch counts' });
  }
};
