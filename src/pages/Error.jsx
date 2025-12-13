export default function ErrorPage({ status }) {
    let title = status || "Error";
    let message = "Đã xảy ra lỗi.";

    if (status === 404) message = "Không tìm thấy trang.";
    else if (status === 500) message = "Lỗi máy chủ.";
    else if (status === 403) message = "Truy cập bị từ chối.";

    return (
        <html>
            <head>
                <title>{title}</title>
            </head>
            <body className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-6xl font-bold text-red-600">{title}</h1>
                <p className="text-lg text-gray-700 mt-4">{message}</p>
                <a href="/" className="mt-6 text-blue-500 hover:underline">
                    Quay lại trang chủ
                </a>
            </body>
        </html>
    );
}
