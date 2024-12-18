import React from "react";
import './utilPages.css';

function EmployeePopup({ x, y, departmentList, projectList, employee, onDel, onClose }) {

    const positions = [
        { value: '0', label: '대기' },
        { value: '1', label: '사원' },
        { value: '2', label: '주임' },
        { value: '3', label: '대리' },
        { value: '4', label: '과장' },
        { value: '5', label: '차장' },
        { value: '6', label: '부장' },
        { value: '7', label: '사장' }
      ];

    if(projectList === null){
        return (
            <div className='employee_popup_menu' style={{ top: y, left: x }}>
                <p>이름:{employee.name}</p>
                <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                    직급:<select onChange={(e) => onClose(employee.company_id, e.target.value, -1)}>
                        {positions.map((p) => (
                            <option key={p.value} value={p.value}>
                                {p.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                    부서:<select onChange={(e) => onClose(employee.company_id, -1, e.target.value)}>
                        <option key='0' value='0'>대기</option>
                        {departmentList.map((d) => (
                            <option key={d.no} value={d.no}>
                                {d.department_name}부서
                            </option>
                        ))}
                    </select>
                </div>
                <button onClick={(e) => {
                    onDel(employee.company_id);
                    onClose('x', -1, -1);
                }}>해고</button>
                <button onClick={(e) => onClose('x', -1, -1)}>닫기</button>
            </div>
        );
    }

    if(departmentList === null && onDel === null){
        return (
            <div className='employee_popup_menu' style={{ top: y, left: x }}>
                <p>이름:{employee.name}</p>
                <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                    프로젝트:<select onChange={(e) => onClose(employee.company_id, e.target.value)}>
                        <option key='0' value='0'>대기</option>
                        {projectList.map((d) => (
                            <option key={d.no} value={d.no}>
                                {d.project_name}
                            </option>
                        ))}
                    </select>
                </div>
                <button onClick={(e) => onClose('x', -1,)}>닫기</button>
            </div>
        );
    }
}

export default EmployeePopup;