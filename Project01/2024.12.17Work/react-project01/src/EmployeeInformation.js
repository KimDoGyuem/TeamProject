import './App.css';

function EmployeeInformation({ name, position, xxx }) {

    const p = ['사원', '주임', '대리', '과장', '차장', '부장', '사장'];
    let pName = '';

    for (let i = 0; i < p.length; i++) {
        if (position === i + 1) {
            pName = p[i];
            break;
        }
    }

    return (
        <div className={`employee_information ${name}`} onClick={xxx}>
            <div id='info'>
                이름:{name}<br />
                직급:{pName}
            </div>
        </div>
    );
}

export default EmployeeInformation;