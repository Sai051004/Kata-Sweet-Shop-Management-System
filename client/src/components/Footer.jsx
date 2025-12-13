import { FiHeart, FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="footer animate-fade-in">
            <div className="container footer-content">
                <div className="footer-brand">
                    <h3>SweetShop</h3>
                    <p>Delivering happiness, one sweet at a time.</p>
                </div>

                <div className="footer-links">
                    <div className="social-links">
                        <a href="#" className="social-icon"><FiInstagram /></a>
                        <a href="#" className="social-icon"><FiTwitter /></a>
                        <a href="#" className="social-icon"><FiFacebook /></a>
                    </div>
                    <p className="copyright">
                        &copy; {new Date().getFullYear()} SweetShop.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
