/**
 * Created by nwu on 10/29/17.
 */
import {connect} from 'react-redux';
import {removeMidnightRefresh} from '../../../redux/midnight/actions';
import RemoveDialog from '../RemoveDialog';

function mapDispatchToProps(dispatch) {
  return {
    remove: removeMidnightRefresh(dispatch),
  }
}

function mapStateToProps(state) {
  return ({
    token: state.session.token,
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveDialog);