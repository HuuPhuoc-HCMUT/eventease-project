export const loginVerify = (req, res) => {
  // Tại đây bạn có thể thêm logic: Lưu user vào DB, kiểm tra quyền hạn, v.v.
  res.status(200).json({
    message: "Xác thực thành công qua Controller!",
    uid: req.user.uid,
    email: req.user.email
  });
};