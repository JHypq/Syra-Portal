import styles from "./Employees.module.css"
import { Link } from "react-router-dom"
import { RiEdit2Line, RiDeleteBin6Line } from "react-icons/ri"
import { LuChevronsUpDown } from "react-icons/lu"

const rows = [
  { id:"EMP-0001", fullName:"Mate Moho", email:"mmoho98@outlook.com", mobile:"+44 7700 900001", dob:"1990-04-22", contractType:"Full-time", salaryType:"Salary", rate:90000, role:"Engineer", department:"Engineering", workMode:"Hybrid", managerId:"EMP-0003", managerName:"Jane Manager", startDate:"2023-04-10", contractEnd:null, createdAt:"2023-04-01" },
  { id:"EMP-0002", fullName:"Ava Stone", email:"ava.stone@example.com", mobile:"+44 7700 900002", dob:"1994-07-13", contractType:"Part-time", salaryType:"Wage", rate:42, role:"Designer", department:"Design", workMode:"Remote", managerId:"EMP-0003", managerName:"Jane Manager", startDate:"2024-02-12", contractEnd:null, createdAt:"2024-02-01" },
  { id:"EMP-0003", fullName:"Jane Manager", email:"jane.manager@example.com", mobile:"+44 7700 900003", dob:"1980-06-04", contractType:"Full-time", salaryType:"Salary", rate:120000, role:"Manager", department:"Management", workMode:"Onsite", managerId:"-", managerName:"-", startDate:"2021-09-01", contractEnd:null, createdAt:"2021-08-20" },
  { id:"EMP-0004", fullName:"Liam Chen", email:"liam.chen@example.com", mobile:"+44 7700 900004", dob:"1989-11-08", contractType:"Full-time", salaryType:"Wage", rate:55, role:"Engineer", department:"Engineering", workMode:"Hybrid", managerId:"EMP-0003", managerName:"Jane Manager", startDate:"2022-11-05", contractEnd:null, createdAt:"2022-11-01" },
  { id:"EMP-0005", fullName:"Noah Kim", email:"noah.kim@example.com", mobile:"+44 7700 900005", dob:"1992-03-17", contractType:"Full-time", salaryType:"Salary", rate:98000, role:"Engineer", department:"Engineering", workMode:"Onsite", managerId:"EMP-0003", managerName:"Jane Manager", startDate:"2023-03-14", contractEnd:null, createdAt:"2023-03-01" },
  { id:"EMP-0006", fullName:"Emma Li", email:"emma.li@example.com", mobile:"+44 7700 900006", dob:"1991-03-27", contractType:"Contract", salaryType:"Wage", rate:65, role:"QA", department:"Quality Assurance", workMode:"Remote", managerId:"EMP-0003", managerName:"Jane Manager", startDate:"2024-06-01", contractEnd:"2025-01-01", createdAt:"2024-05-20" },
  { id:"EMP-0007", fullName:"Olivia Park", email:"olivia.park@example.com", mobile:"+44 7700 900007", dob:"1988-05-10", contractType:"Full-time", salaryType:"Salary", rate:76000, role:"Support", department:"Customer Support", workMode:"Onsite", managerId:"EMP-0003", managerName:"Jane Manager", startDate:"2022-01-10", contractEnd:null, createdAt:"2021-12-22" },
  { id:"EMP-0008", fullName:"Mia Reyes", email:"mia.reyes@example.com", mobile:"+44 7700 900008", dob:"1995-09-15", contractType:"Part-time", salaryType:"Wage", rate:35, role:"Designer", department:"Design", workMode:"Hybrid", managerId:"EMP-0003", managerName:"Jane Manager", startDate:"2024-09-02", contractEnd:null, createdAt:"2024-08-10" },
  { id:"EMP-0009", fullName:"Ethan Shah", email:"ethan.shah@example.com", mobile:"+44 7700 900009", dob:"1986-08-23", contractType:"Full-time", salaryType:"Salary", rate:105000, role:"Engineer", department:"Engineering", workMode:"Remote", managerId:"EMP-0003", managerName:"Jane Manager", startDate:"2021-05-03", contractEnd:null, createdAt:"2021-04-20" },
  { id:"EMP-0010", fullName:"Isla Gomez", email:"isla.gomez@example.com", mobile:"+44 7700 900010", dob:"1993-10-18", contractType:"Full-time", salaryType:"Wage", rate:48, role:"Support", department:"Customer Support", workMode:"Onsite", managerId:"EMP-0003", managerName:"Jane Manager", startDate:"2023-10-18", contractEnd:null, createdAt:"2023-10-01" },
  { id:"EMP-0011", fullName:"Sophia Lee", email:"sophia.lee@example.com", mobile:"+44 7700 900011", dob:"1982-03-03", contractType:"Full-time", salaryType:"Salary", rate:87000, role:"QA", department:"Quality Assurance", workMode:"Hybrid", managerId:"EMP-0003", managerName:"Jane Manager", startDate:"2022-07-07", contractEnd:null, createdAt:"2022-07-01" },
  { id:"EMP-0012", fullName:"Jack Rivera", email:"jack.rivera@example.com", mobile:"+44 7700 900012", dob:"1989-08-26", contractType:"Contract", salaryType:"Wage", rate:72, role:"Engineer", department:"Engineering", workMode:"Remote", managerId:"EMP-0003", managerName:"Jane Manager", startDate:"2024-04-01", contractEnd:"2024-12-01", createdAt:"2024-03-25" },
  { id:"EMP-0013", fullName:"Daniel Wu", email:"daniel.wu@example.com", mobile:"+44 7700 900013", dob:"1990-01-18", contractType:"Full-time", salaryType:"Salary", rate:93000, role:"Engineer", department:"Engineering", workMode:"Onsite", managerId:"EMP-0003", managerName:"Jane Manager", startDate:"2022-02-15", contractEnd:null, createdAt:"2022-02-01" },
  { id:"EMP-0014", fullName:"Hannah Patel", email:"hannah.patel@example.com", mobile:"+44 7700 900014", dob:"1993-09-04", contractType:"Part-time", salaryType:"Wage", rate:38.75, role:"Support", department:"Customer Support", workMode:"Hybrid", managerId:"EMP-0007", managerName:"Olivia Park", startDate:"2023-06-20", contractEnd:null, createdAt:"2023-06-10" },
  { id:"EMP-0015", fullName:"Carlos Mendes", email:"carlos.mendes@example.com", mobile:"+44 7700 900015", dob:"1991-01-23", contractType:"Contract", salaryType:"Wage", rate:70.5, role:"QA", department:"Quality Assurance", workMode:"Remote", managerId:"EMP-0003", managerName:"Jane Manager", startDate:"2024-01-08", contractEnd:"2024-06-30", createdAt:"2023-12-22" },
  { id:"EMP-0016", fullName:"Emily Johnson", email:"emily.johnson@example.com", mobile:"+44 7700 900016", dob:"1992-05-12", contractType:"Full-time", salaryType:"Salary", rate:88000, role:"Designer", department:"Design", workMode:"Onsite", managerId:"EMP-0003", managerName:"Jane Manager", startDate:"2022-05-12", contractEnd:null, createdAt:"2022-05-01" },
  { id:"EMP-0017", fullName:"Michael Brown", email:"michael.brown@example.com", mobile:"+44 7700 900017", dob:"1987-03-08", contractType:"Full-time", salaryType:"Salary", rate:97000, role:"Engineer", department:"Engineering", workMode:"Hybrid", managerId:"EMP-0005", managerName:"Tom Director", startDate:"2021-03-08", contractEnd:null, createdAt:"2021-03-01" },
  { id:"EMP-0018", fullName:"Grace Taylor", email:"grace.taylor@example.com", mobile:"+44 7700 900018", dob:"1996-09-14", contractType:"Part-time", salaryType:"Wage", rate:40, role:"Support", department:"Customer Support", workMode:"Remote", managerId:"EMP-0007", managerName:"Olivia Park", startDate:"2023-09-14", contractEnd:null, createdAt:"2023-09-01" },
  { id:"EMP-0019", fullName:"James Anderson", email:"james.anderson@example.com", mobile:"+44 7700 900019", dob:"1990-07-01", contractType:"Full-time", salaryType:"Salary", rate:110000, role:"Engineer", department:"Engineering", workMode:"Onsite", managerId:"EMP-0003", managerName:"Jane Manager", startDate:"2020-07-01", contractEnd:null, createdAt:"2020-06-20" },
  { id:"EMP-0020", fullName:"Sofia Martinez", email:"sofia.martinez@example.com", mobile:"+44 7700 900020", dob:"1985-03-22", contractType:"Contract", salaryType:"Wage", rate:68.25, role:"QA", department:"Quality Assurance", workMode:"Hybrid", managerId:"EMP-0003", managerName:"Jane Manager", startDate:"2024-03-22", contractEnd:"2024-08-01", createdAt:"2024-03-10" }
]

const nf = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
})
const formatRate = (r) =>
    r.salaryType === "Wage"
        ? `${nf.format(r.rate)}/hr`
        : `${nf.format(r.rate)}/yr`

const df = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
const formatDate = (iso) => (iso ? df.format(new Date(iso)) : "—")

const isContractor = (r) => r.contractType === "Contract"
const isExpiredContract = (r) =>
    isContractor(r) && r.contractEnd && new Date(r.contractEnd) < new Date(new Date().toDateString())

export default function People() {
  return (
    <section className={styles.page}>
        <div className={styles.toolbar}>
            <h1 className={styles.title}>Employees</h1>

            <form role="search" className={styles.search}>
                <label htmlFor="empSearch" className={styles.srOnly}>Search employees</label>
                <input
                id="empSearch"
                className={styles.searchInput}
                type="search"
                placeholder="Search employees…"
                aria-label="Search employees"
                />
            </form>
        </div>

      <div className={styles.card}>
        <div className={styles.tableWrap} role="region" aria-label="People table" tabIndex={0}>
            <table className={styles.table}>
                <caption className={styles.srOnly}>Employees in the organization</caption>
                <thead>
                    <tr>
                        <th scope="col" aria-label="Edit"></th>
                        <th scope="col" className={styles.thBtn}>
                            <span>Employee ID</span>
                            <button type="button" className={styles.headBtn} aria-label="Sort or filter Employee ID">
                                <LuChevronsUpDown aria-hidden="true" />
                            </button>
                        </th>
                        <th scope="col" className={styles.thBtn}>
                            <span>Full name</span>
                            <button type="button" className={styles.headBtn} aria-label="Sort or filter Full name">
                                <LuChevronsUpDown aria-hidden="true" />
                            </button>
                        </th>
                        <th scope="col" className={styles.thBtn}>
                            <span>E-mail</span>
                            <button type="button" className={styles.headBtn} aria-label="Sort or filter E-mail">
                                <LuChevronsUpDown aria-hidden="true" />
                            </button>
                        </th>
                        <th scope="col" className={styles.thBtn}>
                            <span>Mobile</span>
                            <button type="button" className={styles.headBtn} aria-label="Sort or filter Mobile">
                                <LuChevronsUpDown aria-hidden="true" />
                            </button>
                        </th>
                        <th scope="col" className={styles.thBtn}>
                            <span>DOB</span>
                            <button type="button" className={styles.headBtn} aria-label="Sort or filter Date of birth">
                                <LuChevronsUpDown aria-hidden="true" />
                            </button>
                        </th>
                        <th scope="col" className={styles.thBtn}>
                            <span>Contract</span>
                            <button type="button" className={styles.headBtn} aria-label="Sort or filter Contract">
                                <LuChevronsUpDown aria-hidden="true" />
                            </button>
                        </th>
                        <th scope="col" className={styles.thBtn}>
                            <span>Work mode</span>
                            <button type="button" className={styles.headBtn} aria-label="Sort or filter Work mode">
                                <LuChevronsUpDown aria-hidden="true" />
                            </button>
                        </th>
                        <th scope="col" className={styles.thBtn}>
                            <span>Salary type</span>
                            <button type="button" className={styles.headBtn} aria-label="Sort or filter Salary type">
                                <LuChevronsUpDown aria-hidden="true" />
                            </button>
                        </th>
                        <th scope="col" className={styles.thBtn}>
                            <span>Pay rate</span>
                            <button type="button" className={styles.headBtn} aria-label="Sort or filter Pay rate">
                                <LuChevronsUpDown aria-hidden="true" />
                            </button>
                        </th>
                        <th scope="col" className={styles.thBtn}>
                            <span>Role</span>
                            <button type="button" className={styles.headBtn} aria-label="Sort or filter Role">
                                <LuChevronsUpDown aria-hidden="true" />
                            </button>
                        </th>
                        <th scope="col" className={styles.thBtn}>
                            <span>Department</span>
                            <button type="button" className={styles.headBtn} aria-label="Sort or filter Department">
                                <LuChevronsUpDown aria-hidden="true" />
                            </button>
                        </th>
                        <th scope="col" className={styles.thBtn}>
                            <span>Manager ID</span>
                            <button type="button" className={styles.headBtn} aria-label="Sort or filter Manager ID">
                                <LuChevronsUpDown aria-hidden="true" />
                            </button>
                        </th>
                        <th scope="col" className={styles.thBtn}>
                            <span>Manager name</span>
                            <button type="button" className={styles.headBtn} aria-label="Sort or filter Manager name">
                                <LuChevronsUpDown aria-hidden="true" />
                            </button>
                        </th>
                        <th scope="col" className={styles.thBtn}>
                            <span>Start of employment</span>
                            <button type="button" className={styles.headBtn} aria-label="Sort or filter Start of employment">
                                <LuChevronsUpDown aria-hidden="true" />
                            </button>
                        </th>
                        <th scope="col" className={styles.thBtn}>
                            <span>Contract end</span>
                            <button type="button" className={styles.headBtn} aria-label="Sort or filter Contract end">
                                <LuChevronsUpDown aria-hidden="true" />
                            </button>
                        </th>
                        <th scope="col" className={styles.thBtn}>
                            <span>Created</span>
                            <button type="button" className={styles.headBtn} aria-label="Sort or filter Created">
                                <LuChevronsUpDown aria-hidden="true" />
                            </button>
                        </th>

                        <th scope="col" aria-label="Terminate"></th>
                    </tr>
                </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id} className={isExpiredContract(r) ? styles.expiredRow : undefined}>
                    <td className={styles.iconCell}>
                        <Link
                            to={`/employees/${r.id}/edit`}
                            className={styles.iconLink}
                            aria-label={`Edit ${r.fullName}`}
                        >
                            <RiEdit2Line />
                        </Link>
                    </td>
                    <td className={styles.id}>{r.id}</td>
                    <td className={styles.name}>{r.fullName}</td>
                    <td><a className={styles.link} href={`mailto:${r.email}`}>{r.email}</a></td>
                    <td><a className={styles.link} href={`tel:${r.mobile?.replace(/\s+/g,'')}`}>{r.mobile ?? ""}</a></td>
                    <td className={styles.num}>{formatDate(r.dob)}</td>
                    <td>{r.contractType}</td>
                    <td>{r.workMode}</td>
                    <td>{r.salaryType}</td>
                    <td>{formatRate(r)}</td>
                    <td>{r.role}</td>
                    <td>{r.department}</td>
                    <td>{r.managerId}</td>
                    <td>{r.managerName}</td>
                    <td>{new Date(r.startDate).toLocaleDateString()}</td>
                    <td className={styles.num}>{isContractor(r) ? formatDate(r.contractEnd) : ""}</td>
                    <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                    <td className={styles.actionsCell}>
                        <button
                            type="button"
                            className={styles.terminateBtn}
                            aria-label={`Terminate ${r.fullName}`}
                            onClick={() => {/* TODO: wire delete */}}
                        >
                            <RiDeleteBin6Line />
                        </button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.tableFooter}>
            <div className={styles.footerLeft}>
                <Link to="/employees/new" className={styles.createBtn} aria-label="Add employee">+ Add employee</Link>
            </div>

            <div className={styles.footerRight}>
                <label className={styles.pageSize}>
                <span className={styles.pageSizeLabel}>Rows per page</span>
                <select className={styles.select} defaultValue="25" aria-label="Rows per page">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
                </label>
            </div>
        </div>
    </div>
    </section>
  )
}