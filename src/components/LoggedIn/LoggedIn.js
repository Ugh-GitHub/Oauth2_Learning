import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Navigate } from 'react-router-dom';

const LoggedIn = ({ children, store }) => {

    if (typeof store.user.id !== 'undefined') {
      return <Navigate to="/user" replace />;
    }
  
    return children;
  };
  
export default connect(mapStoreToProps)(LoggedIn);