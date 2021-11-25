class ContractsController < ApplicationController
  def index
    #if the current user role is a company
    if current_user.role == "Company"
      #display all the contract where company_id 
      
      @contracts = Contract.where(company_id: current_user.company)
      #else 
    else
      #display all contract where individual_id
     
      @contracts = Contract.where(individual_id: current_user.individual)      
    end    
  end

  def show
    @contract = Contract.find(params[:id])
  end

  def new
    #if u are a company
    if current_user.role == "Company"
      @contract = Contract.new
    else
      redirect_to contracts_path
      flash.alert = "You are not allow to create a contract"
    end
  end

  def create
    if current_user.role == "Company"
      #get company id
      @company = current_user.company.id
      
      @contract = Contract.new(contract_params)
      #set the company id
      @contract.company_id = @company
      #find user by recipiant email
      @user = User.find_by(email: @contract.recipient_email)
      # git the individual id
      @individual = Individual.find_by(user_id: @user).id
      #assign to contract individual_id
      @contract.individual_id = @individual
      if @contract.save
        redirect_to contract_path(@contract)
      else
        render :new
      end
    else
      redirect_to contracts_path
      flash.alert = "You are not allow to create a contract"
    end
  end

  private

  def contract_params
    params.require(:contract).permit(:name, :description, :recipient_email)
  end
end
