class ContractsController < ApplicationController
  def index
    case current_user.role
    when "Company"
      @user = current_user.company
      @contracts = Contract.where(company_id: @user)
    when "Individual"
      @user = current_user.individual
      @contracts = Contract.where(individual_id: @user)
    end
  end

  def show
    @contract = Contract.find(params[:id])
  end

  def new
    @company = current_user.company if current_user.role == "Company"
    @contract = Contract.new
  end

  def create
    @contract = Contract.new(new_contract_params)
    @company = current_user.company
    @contract.company = @company
    # This presumes that the recipient email is in our database, else, we will still have to create one (which would conflict with our validations but whatever)
    # The below kind of works but I want to go to the next level faster
    @user = User.where(email: new_contract_params[:recipient_email])
    # Note the below technically returns an array, which is why we need the [0]
    @individual = Individual.where(user_id: User.where(email: new_contract_params[:recipient_email]))[0]
    @contract.individual_id = @individual.id
    if @contract.save
      redirect_to contract_path(@contract)
    else
      render :new
    end
  end

  def edit
    @contract = Contract.find(params[:id])
  end

  def update

  end

  private

  def new_contract_params
    params.require(:contract).permit(:name, :description, :recipient_email, :document, :contract_body)
  end
end
