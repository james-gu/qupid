import db from '../db';
import retrieveBizCoupons from './bizCoupons.js'
export default function login(req) {
  return new Promise((resolve, reject) => {
    const business = {
      email: req.body.email,
      password: req.body.password
    };
    req.session.business = business;

    const queryStr = `select * from business where email = "${business.email}" && password = "${business.password}"`;
    db.query(queryStr, (err, biz) => {
      if (err) {
        console.log('could not find business in business table');
        reject(err);
      } else {
        return resolve(biz[0]);
      }
    });
  });
}
