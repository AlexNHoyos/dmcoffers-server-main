
export interface IPasswordService {
  
    validatePassword(password: string): Promise<void> 
    
    hashPassword(password: string): Promise<string> 
    
    verifyPassword(hashedPassword: string, password: string): Promise<boolean> 
}
