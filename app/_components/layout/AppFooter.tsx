import Link from "next/link";

export default function AppFooter() {

    return (
        <>
            <footer className="pt-20 bg-primary-700">
                <div className="container">
                    <div className="flex flex-col items-center text-center">
                        <Link
                            href="/"
                            className="text-primary font-bold text-4xl italic"
                        >
                            Brand
                        </Link>

                        <p className="text-primary-light-500  mt-7 max-w-160 mb-20">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Minus a accusamus mollitia totam esse.
                            Nesciunt, eius eveniet distinctio sint saepe tempora
                            quidem quae quo soluta magni voluptatem, praesentium
                            ratione? Labore.
                        </p>

                        <div className="text-primary-light-400 pt-3 pb-2 border-t border-t-primary-light-500 w-full text-sm">
                            <div className="flex flex-col sm:flex-row justify-between">
                                {/* <span>
                                    {date}
                                </span> */}
                                <span>
                                    © {new Date().getFullYear()} Brand. All
                                    rights reserved.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
