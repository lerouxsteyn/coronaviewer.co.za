import React from 'react';
import { faGithub, faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FacebookShareButton, TwitterShareButton } from "react-share";

export default () => {

  return (
    <footer className="footer d-flex align-items-center justify-content-between">
    	<div>
    		<strong>Disclaimer:</strong> the developer cannot be held responsible for errors, please double check figures before citing. <br />
    		<strong>Data source:</strong> <a href="https://github.com/dsfsi/covid19za" target="_blank" rel="noopener noreferrer">github.com/dsfsi/covid19za</a>
    	</div>
    	<div className="social">
    		<strong>Share:</strong>
    		<FacebookShareButton url="https://coronaviewer.co.za">
    			<FontAwesomeIcon icon={faFacebookF} size="lg" />
			</FacebookShareButton>
			<TwitterShareButton url="https://coronaviewer.co.za">
    			<FontAwesomeIcon icon={faTwitter} size="lg" />
    		</TwitterShareButton>
    	</div>
    	<div className="social">
    		<a href="https://github.com/lerouxsteyn/coronaviewer.co.za" target="_blank" rel="noopener noreferrer">
    			<FontAwesomeIcon icon={faGithub} size="lg" /><strong>Github</strong>
    		</a>
    	</div>
    </footer>
  );
}
