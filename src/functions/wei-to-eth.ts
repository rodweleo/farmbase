import { formatEther} from 'ethers';

export const weiToEth = (wei) => {
  return formatEther(wei);
}

