import React from 'react';
import Toolbar from 'material-ui/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import styles from 'components/HeaderMenu/headermenu.style';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import { Link } from 'react-router';
import { getAuthPropTypes } from 'proptypes';
import { AsyncStatus } from 'lib/constants';

const HeaderMenu = (props) => (
  <Toolbar style={styles.toolbar}>
    <Link to="/" style={styles.title}><ToolbarTitle text="React Dashboard" /></Link>
    <ToolbarGroup float="right">
      {props.auth.status !== AsyncStatus.SUCCESS &&
        <FlatButton
          label={<Link to="/login" style={styles.link}>Login</Link>}
          primary
        />
      }
      {props.auth.status === AsyncStatus.SUCCESS &&
        <div>
          <IconMenu
            iconButtonElement={
                        Logged user
              <IconButton touch>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <Link to="/user/preferences"><MenuItem primaryText="Preferences" /></Link>
            <Link to="/logout"><MenuItem primaryText="Logout" /></Link>
          </IconMenu>
        </div>
      }
    </ToolbarGroup>
  </Toolbar>
);

HeaderMenu.propTypes = {
  auth: getAuthPropTypes(),
};

export default HeaderMenu;
