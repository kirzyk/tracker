import { IssuesService } from './services/issues.service';
import { Issue } from './models/issue.model';
import { STATE_OPEN } from './constants';
import * as uuid from 'uuid';
import { View } from './view';

const service = new IssuesService();
const view = new View();


window.addEventListener('load', () => {
    bindEvents();
    service.onAddIssue.subscribe(issue => view.appendIssue(issue, () => { service.delete(issue) }));
    service.onRemoveIssue.subscribe(issue => view.removeIssue(issue));
    service.onChangeState.subscribe(issue => view.updateState(issue));
    view.onNextStateClick.subscribe(args => service.updateState(args.issue, args.nextState));
    service.getList();
});


function bindEvents() {
    document.getElementById('saveIssue').addEventListener('click', async () => {
        await save();
    });
    document.getElementById('cancelIssue').addEventListener('click', async () => {
        closeModal();
    });
}

async function save() {
    const id = uuid.v4();
    const title = $('#issueTitle').val();
    const description = $('#issueDescription').val();
    if (title.length === 0 || description.length === 0) {
        alert('Please fill in all fields!');
    } else {
        const newIssue = new Issue(id, title, description, STATE_OPEN);
        await service.create(newIssue);
        closeModal();
    }
}

function cleanFormGroup() {
    $('#issueTitle').val('');
    $('#issueDescription').val('');
}

function closeModal() {
    $('#createNewIssueModal').modal('hide');
    cleanFormGroup();
}
