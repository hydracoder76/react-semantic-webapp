import { action, extendObservable, map, observable } from 'mobx';
import moment from 'moment-timezone';

class AccountStore {
  constructor() {
    extendObservable(this, {
      info: null,
      error: null,
      success: null,
      loading: false,
      accounts: [],
      timezone: moment.tz.guess(),
      facebookProfile: map(),
      facebookPages: observable([]),
      facebookGroups: observable([]),
      facebookIds: observable([]),
      setAccounts: action((accounts) => {
        this.accounts = accounts;
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
        this.error = error;
      }),
      toggleAccountLoading: action(() => {
        this.loading = !this.loading;
      })
    });
  }
}

const accountStore = new AccountStore();
export default accountStore;
export { AccountStore }
