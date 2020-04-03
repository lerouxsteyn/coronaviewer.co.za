import React from 'react';
import { faGithub, faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FacebookShareButton, TwitterShareButton } from "react-share";

export default () => {

  return (
    <footer className="footer d-flex align-items-center justify-content-between">
    	<div>
    		<strong>Disclaimer:</strong> the developer cannot be held responsible for errors, please double check figures before citing. <br />
    		<strong>Data source:</strong> <a href="https://github.com/pomber/covid19" target="_blank" rel="noopener noreferrer">github.com/pomber/covid19</a> / <a href="https://github.com/CSSEGISandData/COVID-19" target="_blank" rel="noopener noreferrer">github.com/CSSEGISandData/COVID-19</a>
    	</div>
    	<div className="social">
    		<strong>Share:</strong>
    		<FacebookShareButton url="https://coronaviewer.com">
    			<FontAwesomeIcon icon={faFacebookF} size="lg" />
			</FacebookShareButton>
			<TwitterShareButton url="https://coronaviewer.com">
    			<FontAwesomeIcon icon={faTwitter} size="lg" />
    		</TwitterShareButton>
    	</div>
    	<div className="social">
    		<a href="https://github.com/lerouxsteyn/coronaviewer.com" target="_blank" rel="noopener noreferrer">
    			<FontAwesomeIcon icon={faGithub} size="lg" /><strong>Github</strong>
    		</a>
    	</div>
    </footer>
  );
}
