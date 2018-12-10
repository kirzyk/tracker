import { Subject } from 'rxjs';

export class View {

    constructor() {
        this._nextStateSubject = new Subject();
    }

    get onNextStateClick() {
        return this._nextStateSubject;
    }

    createNextButton(issue, nextState) {
        const button = $(`<button class="btn-link change-state">${nextState.toUpperCase()}</button>`);
        button._nextState = nextState
        button.on('click', () => this._nextStateSubject.next({issue: issue, nextState: button._nextState}));
        return button;
    }

    updateNextButton(issue, nextState) {
        const button = $(`#issue_${issue.id} .change-state`);
        if (button) {
            if (nextState) {
                button._nextState = nextState;
                button.text(nextState.toUpperCase());
            }
            else {
                button.parent().remove();
            }
        }
    }

    appendIssue(issue, removeIssue) {
        const cardHeader = $(`
            <div class="card-header">
                ${issue.title}
                <button class="btn btn-link float-right"><i class="fa fa-times"></i></button>
            </div>
        `);
        cardHeader.find('button').on('click', () => removeIssue(issue));
        const cardBody = $(`
            <div class="card-body">
                <div class="card-description">${issue.description}</div>
            </div>
        `);
        const stateLabel = $(`
            <span class="state-value">${issue.state.toUpperCase()}</span>
        `);
        const cardFooter = $(`
            <div class="card-footer">
                <span class="float-left">State:&nbsp;</span>
            </div>
        `);
        cardFooter.append(stateLabel);
        const nextState = issue.nextState;
        if (nextState) {
            const nextStateSelector = $(`
            <span class="float-right">Mark as:&nbsp;</span>
        `);
            nextStateSelector.append(this.createNextButton(issue, nextState));
            cardFooter.append(nextStateSelector);
        }
        const issueCard = $(`<div id="issue_${issue.id}" class="card"></div>`)
            .append(cardHeader)
            .append(cardBody)
            .append(cardFooter);

        $('#issuesList').prepend(issueCard);
    }

    removeIssue(issue) {
        $(`#issue_${issue.id}`).remove();
    }

    updateState(issue) {
        $(`#issue_${issue.id} span.state-value`).text(issue.state.toUpperCase());
        this.updateNextButton(issue, issue.nextState);
    }
}