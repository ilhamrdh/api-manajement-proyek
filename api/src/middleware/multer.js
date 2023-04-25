import multer from "multer";

const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

const upload = (fieldName) => {
    return multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, `public/${fieldName}s`);
            },
            filename: (req, file, cb) => {
                const timestamp = new Date().getTime();
                const filename = file.originalname;
                cb(null, `${timestamp}-${filename}`);
            },
        }),
        limits: {
            fileSize: 3 * 1000 * 1000,
        },
        fileFilter: (req, file, cb) => {
            const extension = file.originalname.split(".").pop();
            if (!allowedExtensions.includes(`.${extension}`)) {
                const error = new Error("File type not allowed");
                error.code = "FILE_TYPE_NOT_ALLOWED";
                return cb(error, false);
            }
            cb(null, true);
        },
    }).single(fieldName);
};

export default upload;
