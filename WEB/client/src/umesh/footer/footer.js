import React from "react";
import './footer.css'

function Footer() {
    return(
        <>
            <br/> <br/> <br/> <br/>
            <div className="footer">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-4 offset-1 col-sm-2">
                            <h5>Links</h5>
                            <ul className="list-unstyled">
                                <li><a href="/home">Home</a></li>
                                <li><a href="/home">About</a></li>
                                <li><a href="/home">Menu</a></li>
                                <li><a href="/home">Contact</a></li>
                            </ul>
                        </div>
                        <div className="col-7 col-sm-5">
                            <h5>Address</h5>
                            <address>
                                No 45/8,<br />
                                New Kandy Rd,<br />
                                Colombo<br />
                                <i className="fa fa-phone fa-lg"></i>: +94 77 582 1432<br />
                                <i className="fa fa-fax fa-lg"></i>: +94 75 421 5632<br />
                                <i className="fa fa-envelope fa-lg"></i>: <a href="umeshranthilina@gmail.com">
                                umeshranthilina@gmail.com</a>
                            </address>
                        </div>
                        <div className="col-12 col-sm-4 align-self-center">
                            <div className="text-center">
                                <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                                <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                                <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                                <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                                <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                                <a className="btn btn-social-icon" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                            </div>
                            <br/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <p>© Copyright 2021 Internship</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer;
