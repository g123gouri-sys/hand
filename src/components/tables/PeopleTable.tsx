import { Card } from '../ui/card'

const people = [
  ['1', 'Dakota Rice', '$36,738', 'Niger', 'Oud-Turnhout'],
  ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
  ['3', 'Sage Rodriguez', '$56,142', 'Netherlands', 'Baileux'],
  ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park'],
  ['5', 'Doris Greene', '$63,542', 'Malawi', 'Feldkirchen in Kärnten'],
  ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester'],
]

export function PeopleTable({ striped = false }: { striped?: boolean }) {
  const contents = <>
  <div className="people-table-heading">
    <h2>{striped ? 'Striped Table with Hover' : 'Table on Plain Background'}</h2>
    <p>Here is a subtitle for this table</p>
  </div>
  <div className="people-table-scroll">
    <table className={`people-table ${striped ? 'striped' : 'plain'}`}>
      <thead>
        <tr>
          <th>ID</th><th>Name</th><th>Salary</th><th>Country</th><th>City</th>
        </tr>
      </thead>
      <tbody>{people.map((row) => <tr key={row[0]}>{row.map((value, index) => 
        <td key={`${row[0]}-${index}`}>{value}</td>)}</tr>)}
      </tbody>
    </table>
  </div></>
  return striped ? 
  <Card className="people-card">{contents}</Card> :
  <section className="plain-table-section">{contents}</section>
}