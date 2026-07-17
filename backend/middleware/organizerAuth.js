export function isOrganizer(req, res, next) {
  if (req.session && req.session.organizer) {
    return next();
  }
  return res.status(401).json({ message: "Organizer not logged in" });
}
