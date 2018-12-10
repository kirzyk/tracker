import { ISSUES_TRACKER } from '../constants';
import { Issue } from '../models/issue.model';
import { Subject } from 'rxjs';

export class IssuesService {

    get onAddIssue() {
        return this.addIssueSubject;
    }

    get onRemoveIssue() {
        return this.removeIssueSubject;
    }

    get onChangeState() {
        return this.changeStateIssueSubject;
    }

    constructor() {
        this.issuesList = [];
        this.addIssueSubject = new Subject();
        this.removeIssueSubject = new Subject();
        this.changeStateIssueSubject = new Subject();
    }

    getList() {
        return new Promise((resolve, reject) => {
            try {
                const list = localStorage.getItem(ISSUES_TRACKER);
                if (!list || list.length === 0) {
                    reject(new Error('incorrect data'));
                }
                const listFromStorage = JSON.parse(list);
                if (!Array.isArray(listFromStorage)) {
                    resolve([]);
                }
                this.issuesList = listFromStorage.map(
                    item => Object.setPrototypeOf(item, Issue.prototype)
                );
                this.issuesList.forEach(issue => this.addIssueSubject.next(issue));
                resolve(this.issuesList);
            } catch (error) {
                reject(error);
            }
        });
    }

    create(issue) {
        return new Promise((resolve, reject) => {
            try {
                if (!issue || !(issue instanceof Issue)) {
                    reject(new Error('incorrect data'));
                }
                this.issuesList.push(issue);
                localStorage.setItem(ISSUES_TRACKER, JSON.stringify(this.issuesList));
                this.addIssueSubject.next(issue);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    delete(issue) {
        return new Promise((resolve, reject) => {
            try {
                if (!issue || !(issue instanceof Issue)) {
                    reject(new Error('incorrect data'));
                }
                const index = this.issuesList.indexOf(issue);
                if (index < 0) {
                    reject();
                }
                this.issuesList.splice(index, 1);
                localStorage.setItem(ISSUES_TRACKER, JSON.stringify(this.issuesList));
                this.removeIssueSubject.next(issue);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    updateState(issue, state) {
        return new Promise((resolve, reject) => {
            try {
                if (!issue || !state || !(issue instanceof Issue)) {
                    reject(new Error('incorrect data'));
                }
                issue.state = state;
                localStorage.setItem(ISSUES_TRACKER, JSON.stringify(this.issuesList));
                this.changeStateIssueSubject.next(issue);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }
}