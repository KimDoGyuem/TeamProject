import './utilPages.css';

function EmployeeInformation({ name, position, xxx }) {

    return (
        <div className={`employee_information ${name}`} onClick={xxx}>
            <div id='info'>
                이름:{name}<br />
                직급:{position}
            </div>
        </div>
    );
}

export default EmployeeInformation;