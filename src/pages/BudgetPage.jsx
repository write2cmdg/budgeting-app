
//rrd imports
import { useLoaderData } from "react-router-dom";

//library imports
import { toast } from "react-toastify";

//components imports
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

//Helper imports
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers"

//Loader
export async function budgetLoader({ params }) {
    const budget = await getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: params.id,
    })[0];

    const expenses = await getAllMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: params.id,
    });

    if(!budget) {
        throw new Error("There was an error finding the budget you requested.")
    }

    return { budget, expenses };
}

//Action
export async function budgetAction({ request }) {
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data)

    if(_action==="createExpense"){
        try {
        //create Expense
          createExpense({
            name: values.newExpense,
            amount: values.newExpenseAmount,
            budgetId: values.newExpenseBudget
          })
    
          return toast.success(`Expense entry for ${values.newExpense} CREATED!`)
        } catch (e) {
          throw new Error("There was a problem creating your Expense.")
        }
      }

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

const BudgetPage = () => {
    const { budget, expenses } = useLoaderData();
  return (
    <div className="grid-lg"
        style={{
            "--accent": budget.color,
        }}
        >
        <h1 className="h2">
            <span className="accent">{budget.name} Overview</span>
        </h1>
        <div className="flex-lg">
            <BudgetItem budget={budget} showDelete={true} />
            <AddExpenseForm budgets={[budget]} />
        </div>
        {
            expenses && expenses.length > 0 && (
                <div className="grid-md">
                    <h2><span className="accent">{budget.name}</span> Expenses</h2>
                    <Table expenses={expenses} showBudget={false} />
                </div>
            )
        }
    </div>
  )
}

export default BudgetPage
 