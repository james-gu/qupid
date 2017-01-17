import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import newCouponValidation from './newCouponValidation';
import * as newCouponActions from 'redux/modules/newCoupon';

// Can insert asyncValidation here if we want validation as user is entering info
// (redux form compliant)
function asyncValidate(data, dispatch, {isValidCoupon}) {
  if (!data.title) {
    return Promise.resolve({});
  }
  return isValidCoupon(data);
}
@connect(
  state => ({
    user: state.auth.user,
  }),
  // Wraps every action creator (values in obj passed in) in dispatches
  // In this case { isValidCoupon: fn }
  dispatch => bindActionCreators(newCouponActions, dispatch)
)

// Define fields in props
@reduxForm({
  // initialize must refer to this form property in container
  form: 'newCoupon',
  fields: [
  // TODO: will need to generate random QR code for coupon
    'title',
    'image',
    'item_name',
    'description',
    'original_price',
    'coupon_savings',
    'start_at',
    'end_at',
    'business_id',
  ],
  validate: newCouponValidation,
  asyncValidate,
  asyncBlurFields: ['title'],
})

export default class NewCouponForm extends Component {

  static propTypes = {
    active: PropTypes.string,
    asyncValidating: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    dirty: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    isValidCoupon: PropTypes.func.isRequired,
  }

  render() {
    const {
      asyncValidating,
      // dirty,
      fields: {
        title,
        image,
        item_name,
        description,
        original_price,
        coupon_savings,
        start_at,
        end_at,
        business_id,
      },
      // active,
      handleSubmit,
      // invalid,
      resetForm,
      customSubmit,
      user
      // pristine,
      // valid
    } = this.props;
    console.log('BUSINESSID HERE....', user);
    const styles = require('./NewCouponForm.scss');
    const renderInput = (field, label, placeholder, showAsyncValidating, value) =>
      <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
        <label htmlFor={field.name} className="col-sm-2">{label}</label>
        <div className={'col-sm-8 ' + styles.inputGroup}>
          {showAsyncValidating && asyncValidating && <i className={'fa fa-cog fa-spin ' + styles.cog}/>}
          { (label === 'Coupon Title') && <input type="text" ref="company_name" className="form-control" placeholder={placeholder} id={field.name} {...field}/> }
          { (label === 'Image Url') && <input type="text" ref="company_name" className="form-control" placeholder={placeholder} id={field.name} {...field}/> }
          { (label === 'Item Name') && <input type="text" ref="company_name" className="form-control" placeholder={placeholder} id={field.name} {...field}/> }
          { (label === 'Description') && <input type="text" ref="company_name" className="form-control" placeholder={placeholder} id={field.name} {...field}/> }
          { (label === 'Original') && <input type="text" ref="company_name" className="form-control" placeholder={placeholder} id={field.name} {...field}/> }
          { (label === 'Savings') && <input type="text" ref="company_name" className="form-control" placeholder={placeholder} id={field.name} {...field}/> }
          { (label === 'Start Time') && <input type="text" ref="company_name" className="form-control" placeholder={placeholder} id={field.name} {...field}/> }
          { (label === 'End Time') && <input type="text" ref="company_name" className="form-control" placeholder={placeholder} id={field.name} {...field}/> }
          { (label === 'Business ID') && <input type="text" ref="company_name" className="form-control" placeholder={placeholder} id={field.name} {...field}/> }
          {field.error && field.touched && <div className="text-danger">{field.error}</div>}
          <div className={styles.flags}>
            {field.dirty && <span className={styles.dirty} title="Dirty">D</span>}
            {field.active && <span className={styles.active} title="Active">A</span>}
            {field.visited && <span className={styles.visited} title="Visited">V</span>}
            {field.touched && <span className={styles.touched} title="Touched">T</span>}
          </div>
        </div>
      </div>;

    return (
      <div className="container">
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {renderInput(title, 'Coupon Title', '$5 off Beard Papas', true)}
          {renderInput(image, 'Image Url', 'https://upload.wikimedia.org/wikipedia/commons/6/64/Banana_Peel.JPG')}
          {renderInput(item_name, 'Item Name', 'Cream Puff')}
          {renderInput(description, 'Description', 'Lorem Ipsum')}
          {renderInput(original_price, 'Original', '5.00')}
          {renderInput(coupon_savings, 'Savings', '2.50')}
          {renderInput(start_at, 'Start Time', '2017-05-21 12:00:00')}
          {renderInput(end_at, 'End Time', '2017-05-21 12:00:00')}
          {renderInput(business_id, 'Business ID', user ? user.business_id : '')}
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-success" onClick={() => {handleSubmit(); customSubmit()}}>
                <i className="fa fa-paper-plane"/> Submit
              </button>
              <button className="btn btn-warning" onClick={resetForm} style={{marginLeft: 15}}>
                <i className="fa fa-undo"/> Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
