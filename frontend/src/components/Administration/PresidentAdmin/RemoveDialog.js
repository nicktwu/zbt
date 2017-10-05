/**
 * Created by nwu on 10/3/17.
 */
import RemoveDialog from '../RemoveDialog';
import {connect} from 'react-redux';
import {remove} from '../../../redux/user/actions';

function mapDispatchToProps(dispatch) {
  return {
    remove: remove(dispatch),
  }
}

function mapStateToProps(state) {
  return ({
    token: state.session.token,
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(RemoveDialog);