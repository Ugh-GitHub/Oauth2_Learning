import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Navigate, Outlet } from 'react-router-dom';

const LoggedIn = ({ children, store }) => {
    if (typeof store.user.id === 'undefined') {
      return <Navigate to="/login" replace />;
    }
  
    return <Outlet/>;
  };
  
export default connect(mapStoreToProps)(LoggedIn);