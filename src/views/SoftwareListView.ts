import { AbstractView } from "./AbstractView";
import Software from "../entities/Software";

export class SoftwareListView extends AbstractView {
    async onStateChange(): Promise<boolean> {
        // Validate state change.
        if(this.state.length > 0 &&
            this.state[0].id &&
            this.state[0].name) {
            return true;
        }

        // If state change is invalid, function returns false.
        return false;
    }


    render(): Element {
        const returnElement = document.createElement('div');

        this.state.forEach((software: Software) => {
            const listElement = document.createElement('a');
            listElement.classList.add('list-group-item');
            listElement.classList.add('list-group-item-action');
            listElement.innerText = software.name;
            listElement.href = '/software/' + software.id;

            returnElement.appendChild(listElement);
        });

        return returnElement;
    }
}

