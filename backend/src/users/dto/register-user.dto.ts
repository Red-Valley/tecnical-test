export class RegisterUserDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly idNumber: string;
  readonly idType: 'CC' | 'CE' | 'TI' | 'PASS ID';
  readonly address: string;
  readonly phoneNumber: string;
}
