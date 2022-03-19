import React from 'react';
import styles from './Footer.scss';
import githubLogo from '../../images/github_logo.png'

 const Footer: React.FC = () => {
    const data = new Date();
    const actualYear = data.getFullYear() 
    return (
        <footer className={styles.footer}>
            <p>&copy; {actualYear} Rengevich Sergei</p>
            <a href="https://github.com/maddkot" target="_blank" rel="noreferrer">
                <img  alt="Иконка гитхаб" src={githubLogo}></img>
            </a>
        </footer>
    )
}

export default Footer;