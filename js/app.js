// Listen for submit

document.getElementById("loan-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const result = (document.getElementById("results").style.display = "none");

  const loader = (document.getElementById("loading").style.display = "block");

  setTimeout(calculateResults, 2000);
});

// Caculate the results
function calculateResults(e) {
  // Form variables
  const inputAmount = document.getElementById("amount");
  const inputInterest = document.getElementById("interest");
  const inputYears = document.getElementById("years");
  const inputMonthPayment = document.getElementById("monthly-payment");
  const inputTotalPayment = document.getElementById("total-payment");
  const inputTotalInteres = document.getElementById("total-interest");
  const principal = parseFloat(inputAmount.value);
  const calculateInterest = parseFloat(inputInterest.value) / 100 / 12;
  const calculatePayment = parseFloat(inputYears.value) * 12;

  // Compute monthly payments
  const x = Math.pow(1 + calculateInterest, calculatePayment);
  const monthly = principal * x * calculateInterest / (x - 1);

  if (isFinite(monthly)) {
    inputMonthPayment.value = monthly.toFixed(2);
    inputTotalPayment.value = (monthly * calculatePayment).toFixed(2);
    inputTotalInteres.value = (monthly * calculatePayment - principal).toFixed(
      2
    );
    document.getElementById("results").style.display = "block";
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check your numbers!!");
  }
}

function showError(error) {
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "none";

  const errorDiv = document.createElement("div");
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading);
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
