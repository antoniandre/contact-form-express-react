import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';


const Home = props => (
  <div>
    <h1>Home</h1>
    <p><br/><br/><br/>Welcome home!<br/>
    You might want to try the<br/><br/><RaisedButton label="Contact us form" onClick={() => props.changePage()} primary></RaisedButton></p>
  </div>
)

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/contact-us')
}, dispatch)


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)