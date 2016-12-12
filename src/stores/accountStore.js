import { action, extendObservable, map, observable } from 'mobx';
import moment from 'moment-timezone';

class AccountStore {
  constructor() {
    let accounts = localStorage.getItem('accounts');
    console.log(accounts);
    if(accounts)
      accounts = JSON.parse(accounts);
    else
      accounts = [];

    extendObservable(this, {
      accountInfo: null,
      accountError: null,
      accountSuccess: null,
      accountLoading: false,
      accounts: observable(accounts),
      timezone: moment.tz.guess(),
      facebookProfile: map(),
      facebookPages: observable([]),
      facebookGroups: observable([]),
      facebookIds: observable([]),
      setAccounts: action((accounts) => {
        this.accounts = accounts;
      }),
      clearAccounts: action(() => {
        this.accounts = [];
      }),
      setTimezone: action((timezone) => {
        this.timezone = timezone;
      }),
      setFacebookProfile: action((profile) => {
        this.facebookProfile.merge(profile);
      }),
      setFacebookPages: action((pages) => {
        this.facebookPages.replace(pages);
      }),
      setFacebookGroups: action((groups) => {
        this.facebookGroups.replace(groups);
      }),
      addFacebookAccount: action((id) => {
        this.facebookIds.push(id);
      }),
      removeFacebookAccount: action((id) => {
        this.facebookIds.remove(id);
      }),
      setAccountError: action((error) => {
        this.accountError = error;
      }),
      toggleAccountLoading: action(() => {
        this.accountLoading = !this.loading;
      })
    });
  }
}

const accountStore = new AccountStore();
export default accountStore;
export { AccountStore }
