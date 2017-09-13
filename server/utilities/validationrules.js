const DESCRIPTIONRULE = {
  'Description'  : 'required|min:3|max:800'
}
const ENTERPRISERULE = {
'EnterpriseName' :'required|min:6|max:800'
}
const FacilityName={
  'FacilityName':'required|min:6|max:30'
}
const ROLERULE = {
'RoleName' :'required|min:6|max:800'
}

const AUTHENTICATERULE = {
  'UserID'  : 'required',
  'Password'  : 'required'
}

exports.DESCRIPTIONRULE = DESCRIPTIONRULE;
exports.FacilityName = FacilityName;
exports.ENTERPRISERULE = ENTERPRISERULE;