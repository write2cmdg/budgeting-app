
//rrd imports 
import { useLoaderData } from "react-router-dom";

//library imports
import { toast } from "react-toastify";

//components imports
import Table from "./components/Table";

//helpers imports
import { deleteItem, fetchData } from "./helpers";


//Loader
export async function expensesLoader() {
    // const userName = fetchData("userName");
    // const budgets = fetchData("budgets");
    const expenses = fetchData("expenses");
    return { /*userName, budgets,*/ expenses }
}

//Action
export async function expensesAction({ request }) {
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data)

    if(_action==="deleteExpense"){
        try {
        //create Expense
          deleteItem({
            key: "expenses",
            id: values.expenseId,
          })
    
          return toast.success(`Expense Entry has been DELETED!`)
        } catch (e) {
          throw new Error("There was a problem deleting your Expense.")
        }
      }
}

const ExpensesPage = () => {

    const { expenses } = useLoaderData()
  return (
    <div className="grid-lg">
        <h1>All Expenses</h1>
        {
            expenses && expenses.length > 0 ? (
                <div className="grid-md">
                    <h2>Recent Expenses <small>({expenses.length} total.)</small></h2>
                    <Table expenses={expenses} />
                </div>
            ) : <p>No Expenses to show.</p>        }
    </div>
  )
}

export default ExpensesPage;
