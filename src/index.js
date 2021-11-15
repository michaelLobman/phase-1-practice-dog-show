document.addEventListener('DOMContentLoaded', renderPups);
const pupUrl = "http://localhost:3000/dogs";

function renderPups(){
    fetch(pupUrl)
    .then(resp => resp.json())
    .then(pups => {
        const pupTableBody = document.getElementById('table-body')
        const pupEditor = document.getElementById('dog-form');
        const pupEditorName = pupEditor.children[0];
        const pupEditorBreed = pupEditor.children[1];
        const pupEditorSex = pupEditor.children[2];
        for(const pup of pups) {
            const pupRow = document.createElement('tr');
            const pupName = document.createElement('td');
            const pupBreed = document.createElement('td');
            const pupSex = document.createElement('td');
            const pupButton = document.createElement('td')
            const pupEdit = document.createElement('button');
            const pupId = pup["id"];
            pupName.textContent = pup["name"];
            pupBreed.textContent = pup["breed"];
            pupSex.textContent = pup["sex"];
            pupEdit.textContent = "Edit";
            pupEdit.addEventListener('click', function(){
                pupEditorName.value = pupName.textContent;
                pupEditorBreed.value = pupBreed.textContent;
                pupEditorSex.value = pupSex.textContent;
                pupEditor.addEventListener('submit', function(){
                    let newPupName = pupEditorName.value;
                    let newPupBreed = pupEditorBreed.value;
                    let newPupSex = pupEditorSex.value;  
                    fetch(`http://localhost:3000/dogs/${pupId}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify({
                            "name": newPupName,
                            "breed": newPupBreed,
                            "sex": newPupSex,
                        })
                    })
                    .then(renderPups());
                });
            })
            pupButton.append(pupEdit);
            pupRow.append(pupName, pupBreed, pupSex, pupButton);
            pupTableBody.append(pupRow);
        }
    })
}
